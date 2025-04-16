package tn.backend.backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.backend.backend.Entities.Community;
import tn.backend.backend.Repository.CommunityRepository;

@Service
public class CommunityService {
    @Autowired
    private CommunityRepository communityRepository;

    public Community createCommunity(Community community) {
        return communityRepository.save(community);
    }

    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }

    public Community getCommunityById(Long id) {
        Optional<Community> community = communityRepository.findById(id);
        return community.orElseThrow(() -> new RuntimeException("Community not found"));
    }

    public Community updateCommunity(Long id, Community updatedCommunity) {
        return communityRepository.findById(id).map(community -> {
            community.setName(updatedCommunity.getName());
            return communityRepository.save(community);
        }).orElseThrow(() -> new RuntimeException("Community not found"));
    }

    public void deleteCommunity(Long id) {
        if (!communityRepository.existsById(id)) {
            throw new RuntimeException("Community not found");
        }
        communityRepository.deleteById(id);
    }
}
