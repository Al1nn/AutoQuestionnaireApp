namespace QuestionnaireAPI.Dtos;

public record QuestionnaireDto(
    int Id,
    string Title,
    string Category,
    List<QuestionDto> Questions);

public record QuestionDto(
    int Id,
    string Text,
    string? Photo,
    List<AnswerDto> Answers);

public record AnswerDto(
    int Id,
    string Text,
    bool IsCorrect);