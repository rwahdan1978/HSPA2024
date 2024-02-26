using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class init5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_propertyTypes_PropertyTypeId",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_propertyTypes",
                table: "propertyTypes");

            migrationBuilder.RenameTable(
                name: "propertyTypes",
                newName: "PropertyTypes");

            migrationBuilder.AddColumn<int>(
                name: "ContactCommission",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ContactCompany",
                table: "Properties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactEmail",
                table: "Properties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactName",
                table: "Properties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactNumber",
                table: "Properties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactNumber2",
                table: "Properties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PropertyTypes",
                table: "PropertyTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_PropertyTypes_PropertyTypeId",
                table: "Properties",
                column: "PropertyTypeId",
                principalTable: "PropertyTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_PropertyTypes_PropertyTypeId",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PropertyTypes",
                table: "PropertyTypes");

            migrationBuilder.DropColumn(
                name: "ContactCommission",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ContactCompany",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ContactEmail",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ContactName",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ContactNumber",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ContactNumber2",
                table: "Properties");

            migrationBuilder.RenameTable(
                name: "PropertyTypes",
                newName: "propertyTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_propertyTypes",
                table: "propertyTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_propertyTypes_PropertyTypeId",
                table: "Properties",
                column: "PropertyTypeId",
                principalTable: "propertyTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
