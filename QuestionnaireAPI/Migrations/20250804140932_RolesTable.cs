using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace QuestionnaireAPI.Migrations
{
    /// <inheritdoc />
    public partial class RolesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Password",
                table: "Users",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordKey",
                table: "Users",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    LastUpdatedBy = table.Column<int>(type: "integer", nullable: false),
                    LastUpdatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Roles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Roles_UserId",
                table: "Roles",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordKey",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Users");
        }
    }
}
