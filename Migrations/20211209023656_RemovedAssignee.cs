using Microsoft.EntityFrameworkCore.Migrations;

namespace venus.Migrations
{
    public partial class RemovedAssignee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Assignee",
                table: "Bugs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Assignee",
                table: "Bugs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
