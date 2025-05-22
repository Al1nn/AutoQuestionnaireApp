# AutoQuestionnaireApp

# Questionnaire Web Application

A comprehensive web-based questionnaire system designed for educational assessments, specifically for driver's license theoretical exams (DRPCIV Category B).

## Screenshots

### Main Quiz Interface
<img width="1097" alt="Screenshot 2025-05-22 at 3 15 44 PM" src="https://github.com/user-attachments/assets/423b6d51-9782-4af6-aa88-2002d7348c01" />

*Interactive question display with multiple choice options, timer, and progress tracking*

### Success Page
<img width="1095" alt="Screenshot 2025-05-22 at 3 13 09 PM" src="https://github.com/user-attachments/assets/3e9453c5-47ea-4032-b339-1264509f56e1" />
*ADMIS! confirmation with recommended learning path steps*

### Failure Page

<img width="1096" alt="Screenshot 2025-05-22 at 3 12 50 PM" src="https://github.com/user-attachments/assets/93912518-050b-49bd-99e1-623f2087bd42" />

*RESPINS! feedback with improvement guidance and retry options*

## Features

### Interactive Quiz Interface
- **Real-time Question Display**: Clean, intuitive interface showing one question at a time
- **Multiple Choice Options**: Support for A, B, C answer options with clear visual distinction
- **Visual Question Support**: Integration of traffic scenario images and diagrams
- **Timer Functionality**: Built-in countdown timer (shown as 00:00:02 format)
- **Progress Tracking**: Live statistics showing:
  - Initial questions remaining
  - Questions left to answer
  - Correct answers count
  - Incorrect answers count

### Question Management
- **Question Indexing**: Sequential question navigation (#index system)
- **Answer Validation**: Immediate feedback on answer selection
- **Question Review**: Options to modify answers before final submission
- **Late Response Handling**: "Răspunde mai târziu" (Answer Later) functionality

### Results & Feedback System

#### Success State (ADMIS!)
- **Pass Notification**: Clear success message with congratulations
- **Learning Path Recommendations**: Structured 4-step learning program:
  1. **Step 1**: 3D Video Road Legislation Course
  2. **Step 2**: Road Signs and Markings Explained
  3. **Step 3**: Video/Text Learning Medium
  4. **Step 4**: DRPCIV Questionnaire with Video/Text Explanations

#### Failure State (RESPINS!)
- **Failure Notification**: Clear feedback on unsuccessful attempt
- **Improvement Guidance**: Recommendation to follow the 4 learning steps
- **Retry Option**: Easy navigation back to restart the process

### Technical Specifications
- **Framework**: Built with Swagger UI integration
- **Responsive Design**: Clean, modern interface optimized for various screen sizes
- **Multi-language Support**: Currently supports Romanian language
- **Local Development**: Runs on localhost:4200 with multiple route handling:
  - `/questionnaire` - Main quiz interface
  - `/correct` - Success page
  - `/failed` - Failure page

### User Experience
- **Intuitive Navigation**: Simple button-based interaction
- **Visual Feedback**: Color-coded responses (green for success, red for failure)
- **Clear Typography**: Easy-to-read fonts and proper contrast
- **Action Buttons**:
  - Submit Answer (Trimite Răspunsul)
  - Modify Answer (Modifică răspunsul)
  - Answer Later (Răspunde mai târziu)
  - Back Navigation (Înapoi)

## Use Cases
- Driver's license theoretical examination preparation
- Educational assessment systems
- Training and certification programs
- Knowledge evaluation platforms

## Educational Value
The application provides a complete learning ecosystem with both assessment and educational content, making it suitable for comprehensive driver education programs.

---
*Inspired by ScoalaRutiera.ro*
