using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class ShtuarEntitetiMesazh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Mesazhet",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DerguesId = table.Column<int>(nullable: false),
                    MarresId = table.Column<int>(nullable: false),
                    Permbajtja = table.Column<string>(nullable: true),
                    ELexuar = table.Column<bool>(nullable: false),
                    DataLeximit = table.Column<DateTime>(nullable: true),
                    MesazhiDerguarMe = table.Column<DateTime>(nullable: false),
                    DerguesiKaFshierMszh = table.Column<bool>(nullable: false),
                    MarresiKaFshierMszh = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mesazhet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mesazhet_Perdoruesit_DerguesId",
                        column: x => x.DerguesId,
                        principalTable: "Perdoruesit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mesazhet_Perdoruesit_MarresId",
                        column: x => x.MarresId,
                        principalTable: "Perdoruesit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mesazhet_DerguesId",
                table: "Mesazhet",
                column: "DerguesId");

            migrationBuilder.CreateIndex(
                name: "IX_Mesazhet_MarresId",
                table: "Mesazhet",
                column: "MarresId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mesazhet");
        }
    }
}
