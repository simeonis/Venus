using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace venus.Migrations
{
    public partial class BugProjID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Projects_ProjectID",
                table: "Bugs");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectID",
                table: "Bugs",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_Projects_ProjectID",
                table: "Bugs",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Projects_ProjectID",
                table: "Bugs");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectID",
                table: "Bugs",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_Projects_ProjectID",
                table: "Bugs",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
