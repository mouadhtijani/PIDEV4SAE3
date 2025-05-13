# 🎓 OptiMatch - AI-Enhanced Internship Management Platform

OptiMatch is an intelligent, full-stack internship management system designed to streamline and enhance the internship experience for students, supervisors, and administrators. Built with microservices architecture and enriched with cutting-edge AI features, OptiMatch goes beyond simple application handling — it delivers meaningful engagement and smart matchmaking.

---

## 🚀 Key Features

### 👤 User Management
- Dual-role authentication: Student or Supervisor
- Secure login and session handling

### 💼 Internship Module
- View and apply to internship offers
- Real-time feedback and ratings from past interns
- Internships ranked by rating
- AI-powered classification using **KNN** (based on location and description)

### 📊 Application Status
- Students can track internship application decisions (Accepted/Rejected)

### 📅 Events Module
- Discover and keep up with upcoming internship-related events

### 🧑‍💼 Interview Scheduling
- Plan and conduct interviews with:
  - Live video calls
  - Real-time chat via **WebSocket**
  - Screen sharing

### 🌐 Community Module
- Publish posts, comment, and reply
- Sentiment analysis (positive/negative detection)
- Image-to-text description with **GROQ API**
- AI moderation and tagging

### 🧠 IQ Test Module
- Timed quizzes with live camera monitoring
- Automatic webcam capture every 30 seconds
- Cheat detection using **OpenCV** (multi-face detection)

### 🤖 Data Science Chatbot
- AI-powered assistant using **RAG (Retrieval-Augmented Generation)**
- Trained on domain-specific PDF content for Data Science students

---

## ⚙️ Architecture & Technologies

### 🧱 Microservices Architecture
- Modular services for scalability and maintainability

### 🛠 Backend
- Spring Boot
- Eureka Server (Service Discovery)
- Spring Cloud Config (Centralized Configuration)
- Spring Cloud Gateway (API Gateway)
- JPA/Hibernate
- RESTful APIs
- WebSocket for real-time messaging

### 🎨 Frontend
- Angular
- Reactive Forms, Routing, HTTP Client

### 🧠 AI & ML
- **KNN** for internship classification
- **OpenCV** for cheat detection
- **NLP** for sentiment analysis
- **GROQ API** for image captioning
- **RAG** for chatbot (PDF-based knowledge embedding)

### 🧪 Testing & Monitoring
- Unit tests (JUnit)
- Postman for API testing
- Swagger for API documentation

---

## 🖥️ Screenshots

> 📸 [Include your screenshots here or in a `/screenshots` folder]

---

## 📦 Installation & Setup

### Prerequisites
- Java 17+
- Node.js 16+
- Angular CLI
- MySQL or PostgreSQL
- Maven
- Docker (optional for deployment)

### Backend
```bash
cd backend/
./mvnw clean install
