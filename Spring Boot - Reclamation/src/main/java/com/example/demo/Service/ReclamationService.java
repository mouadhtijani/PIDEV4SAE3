package com.example.demo.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.qrcode.QRCodeWriter;
import com.example.demo.Entity.HistoryEntry;
import com.example.demo.Entity.Reclamation;
import com.example.demo.Entity.ReclamationStatus;
import com.example.demo.Repository.HistoryRepository;
import com.example.demo.Repository.ReclamationRepository;
import com.example.demo.Entity.ActionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.Files;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.imageio.ImageIO;
import java.time.LocalDateTime;

@Service
public class ReclamationService {

    @Autowired
    private ReclamationRepository repository;

    @Autowired
    private HistoryRepository historyRepository;

    public Reclamation createReclamation(Reclamation reclamation) {
        Reclamation saved = repository.save(reclamation);

        // Générer le QR Code pour la réclamation créée avec title, description, response
        generateQRCode(saved);

        HistoryEntry entry = new HistoryEntry();
        entry.setActionType(ActionType.CREATION);
        entry.setTimestamp(LocalDateTime.now());
        entry.setReclamation(saved);
        historyRepository.save(entry);

        return saved;
    }

    public Reclamation updateAdminResponse(Long id, String adminResponse) {
        Reclamation reclamation = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réclamation non trouvée"));

        reclamation.setAdminResponse(adminResponse);
        reclamation.setStatus(ReclamationStatus.RESOLVED);
        Reclamation saved = repository.save(reclamation);

        // Générer le QR Code pour la réclamation mise à jour avec title, description, response
        generateQRCode(saved);

        HistoryEntry entry = new HistoryEntry();
        entry.setActionType(ActionType.RESPONSE);
        entry.setTimestamp(LocalDateTime.now());
        entry.setReclamation(saved);
        historyRepository.save(entry);

        return saved;
    }

    public List<HistoryEntry> getFullHistory() {
        return historyRepository.findAllByOrderByTimestampDesc();
    }

    public List<Reclamation> getAllReclamations() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public List<Reclamation> getUserReclamations(String userId) {
        return repository.findByUserId(userId);
    }

    public byte[] getQRCodeData(String reclamationId) throws IOException {
        String qrCodePath = "qr_codes/" + reclamationId + ".png";
        if (Files.exists(FileSystems.getDefault().getPath(qrCodePath))) {
            return Files.readAllBytes(FileSystems.getDefault().getPath(qrCodePath));  // Return the file as bytes
        }
        return null;
    }

    private void generateQRCode(Reclamation reclamation) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();

            // Add title, description, and response in the QR data
            String data = "Title: " + reclamation.getTitle() + "\n" +
                    "Description: " + reclamation.getDescription() + "\n" +
                    "Response: " + (reclamation.getAdminResponse() != null ? reclamation.getAdminResponse() : "No response");

            // QR code hints and encoding
            Map<EncodeHintType, Object> hints = Map.of(EncodeHintType.MARGIN, 1);
            BufferedImage qrImage = toBufferedImage(qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 150, 150, hints));

            // Save QR image to a file
            Path path = FileSystems.getDefault().getPath("qr_codes", reclamation.getId() + ".png");
            ImageIO.write(qrImage, "PNG", path.toFile());

            System.out.println("QR Code generated and saved as: " + path.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    private BufferedImage toBufferedImage(com.google.zxing.common.BitMatrix matrix) {
        int width = matrix.getWidth();
        int height = matrix.getHeight();
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        image.createGraphics();

        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                image.setRGB(x, y, (matrix.get(x, y) ? 0x000000 : 0xFFFFFF)); // Black and white
            }
        }

        return image;
    }
}
