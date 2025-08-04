namespace QuestionnaireAPI.Extensions;

public static class StringExtensions
{
    public static bool isEmpty(this string str)
    {
        return string.IsNullOrEmpty(str.Trim());
    }
}