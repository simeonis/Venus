﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace venus.Migrations
{
    public partial class UpdatedBug : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_AspNetUsers_ApplicationUserId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ApplicationUserId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Bugs",
                newName: "Subject");

            migrationBuilder.RenameColumn(
                name: "Details",
                table: "Bugs",
                newName: "Creator");

            migrationBuilder.AddColumn<string>(
                name: "Assignee",
                table: "Bugs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ApplicationUserProject",
                columns: table => new
                {
                    ProjectsID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UsersListId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserProject", x => new { x.ProjectsID, x.UsersListId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserProject_AspNetUsers_UsersListId",
                        column: x => x.UsersListId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApplicationUserProject_Projects_ProjectsID",
                        column: x => x.ProjectsID,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserProject_UsersListId",
                table: "ApplicationUserProject",
                column: "UsersListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserProject");

            migrationBuilder.DropColumn(
                name: "Assignee",
                table: "Bugs");

            migrationBuilder.RenameColumn(
                name: "Subject",
                table: "Bugs",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Creator",
                table: "Bugs",
                newName: "Details");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Projects",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ApplicationUserId",
                table: "Projects",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_AspNetUsers_ApplicationUserId",
                table: "Projects",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
