using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class KlasaZgjeruarPerdoruesve : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataELindjes",
                table: "Perdoruesit",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Gjinia",
                table: "Perdoruesit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Intereset",
                table: "Perdoruesit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InteresuarPer",
                table: "Perdoruesit",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "KrijuarMe",
                table: "Perdoruesit",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "NjohurSi",
                table: "Perdoruesit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Prezantimi",
                table: "Perdoruesit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Qyteti",
                table: "Perdoruesit",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SeFundiAktiv",
                table: "Perdoruesit",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Shteti",
                table: "Perdoruesit",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Fotot",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(nullable: true),
                    Pershkrimi = table.Column<string>(nullable: true),
                    DataEShtimit = table.Column<DateTime>(nullable: false),
                    aKryesor = table.Column<bool>(nullable: false),
                    PerdoruesId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fotot", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Fotot_Perdoruesit_PerdoruesId",
                        column: x => x.PerdoruesId,
                        principalTable: "Perdoruesit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Fotot_PerdoruesId",
                table: "Fotot",
                column: "PerdoruesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Fotot");

            migrationBuilder.DropColumn(
                name: "DataELindjes",
                table: "Perdoruesit");

            migrationBuilder.DropColumn(
                name: "Gjinia",
                table: "Perdoruesit");

            migrationBuilder.DropColumn(
                name: "Intereset",
                table: "Perdoruesit");

            migrationBuilder.DropColumn(
                name: "InteresuarPer",
                table: "Perdoruesit");

            migrationBuilder.DropColumn(
                name: "KrijuarMe",
                table: "Perdoruesit");

            migrationBuilder.DropColumn(
                name: "NjohurSi",
                table: "Perdoruesit");

            migrationBuilder.DropColumn(
                name: "Prezantimi",
                table: "Perdoruesit");

            migrationBuilder.DropColumn(
                name: "Qyteti",
                table: "Perdoruesit");

            migrationBuilder.DropColumn(
                name: "SeFundiAktiv",
                table: "Perdoruesit");

            migrationBuilder.DropColumn(
                name: "Shteti",
                table: "Perdoruesit");
        }
    }
}
