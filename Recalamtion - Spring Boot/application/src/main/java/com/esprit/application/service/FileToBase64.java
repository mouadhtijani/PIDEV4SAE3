package com.esprit.application.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;

public class FileToBase64 {

    public static void main(String[] args) throws IOException {
        // Path to your PDF file
        File file = new File("C:/Users/mouad/Downloads/SEM1/SEM1/UML/TD2 Analyse dynamique.pdf");
        byte[] fileContent = Files.readAllBytes(file.toPath());
        String encodedString = Base64.getEncoder().encodeToString(fileContent);
        System.out.println(encodedString);
    }
}
