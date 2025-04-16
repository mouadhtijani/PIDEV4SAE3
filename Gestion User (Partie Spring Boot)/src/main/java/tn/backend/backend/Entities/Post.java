package tn.backend.backend.Entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private LocalDate dateCreation;
    private String description;

    @Enumerated(EnumType.STRING) 
    private PostCategorie categorie;

    @ManyToOne
    @JoinColumn(name = "community_id")
	@JsonBackReference
    private Community community;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	@JsonManagedReference
    private List<Reply> replies = new ArrayList<>();

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(LocalDate dateCreation) {
		this.dateCreation = dateCreation;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public PostCategorie getCategorie() {
		return categorie;
	}

	public void setCategorie(PostCategorie categorie) {
		this.categorie = categorie;
	}

	public Community getCommunity() {
		return community;
	}

	public void setCommunity(Community community) {
		this.community = community;
	}

	public List<Reply> getReplies() {
		return replies;
	}

	public void setReplies(List<Reply> replies) {
		this.replies = replies;
	}

	public Long getPostId() {
		return Id;
	}

	public void setPostId(Long postId) {
		this.Id = postId;
	}
	
	
    
}
