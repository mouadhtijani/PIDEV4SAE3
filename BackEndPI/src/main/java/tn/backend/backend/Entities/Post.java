package tn.backend.backend.Entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
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
	@Column(length = 10000)
	private String description;
	private String sentiment;
	private String img;
	@Enumerated(EnumType.STRING)
	private PostCategorie categorie;

	@ManyToOne
	@JoinColumn(name = "community_id")
	@JsonBackReference
	private Community community;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Reply> replies = new ArrayList<>();

	private int voteCount = 0;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	private List<Vote> votes = new ArrayList<>();

	@Column(name = "user_id")
	private Long userId;
	public int getVoteCount() {
		return voteCount;
	}

	public void setVoteCount(int voteCount) {
		this.voteCount = voteCount;
	}

	public List<Vote> getVotes() {
		return votes;
	}

	public void setVotes(List<Vote> votes) {
		this.votes = votes;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getSentiment() {
		return sentiment;
	}

	public void setSentiment(String sentiment) {
		this.sentiment = sentiment;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	@Override
	public String toString() {
		return "Post{" +
				"Id=" + Id +
				", name='" + name + '\'' +
				", dateCreation=" + dateCreation +
				", description='" + description + '\'' +
				", categorie=" + categorie +
				", community=" + (community != null ? community.getCommunityId() : "null") +
				", replies=" + replies.size() +
				", voteCount=" + voteCount +
				", votes=" + votes.size() +
				", userId=" + userId +
				'}';
	}
}