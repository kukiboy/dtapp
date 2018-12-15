using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class ShtuarEntitetiPelqim : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pelqimet",
                columns: table => new
                {
                    PelqyesId = table.Column<int>(nullable: false),
                    PelqyerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pelqimet", x => new { x.PelqyesId, x.PelqyerId });
                    table.ForeignKey(
                        name: "FK_Pelqimet_Perdoruesit_PelqyerId",
                        column: x => x.PelqyerId,
                        principalTable: "Perdoruesit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Pelqimet_Perdoruesit_PelqyesId",
                        column: x => x.PelqyesId,
                        principalTable: "Perdoruesit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pelqimet_PelqyerId",
                table: "Pelqimet",
                column: "PelqyerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pelqimet");
        }
    }
}
