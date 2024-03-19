This application was developed for Web
Application module, as coursework portfolio project @ WIUT by student ID: 00013404"

# Server API

## Description
This project is a RESTful API built with ASP.NET Core for managing books and comments. 
It provides endpoints for CRUD operations on books and comments, along with support for HTTPS and Swagger documentation.

## Setup

1. **Create a new project:**
    ```bash
    dotnet new webapi --use-controllers -o server
    ```

2. **Generate .gitignore file:**
    ```bash
    dotnet new gitignore
    ```

3. **Trust HTTPS certificate:**
    ```bash
    dotnet dev-certs https --trust
    ```

4. **Install necessary packages:**
    ```bash
    dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
    dotnet add package Microsoft.EntityFrameworkCore.Design
    dotnet add package Microsoft.EntityFrameworkCore.SqlServer
    dotnet add package Microsoft.EntityFrameworkCore.Tools
    dotnet tool uninstall -g dotnet-aspnet-codegenerator
    dotnet tool install -g dotnet-aspnet-codegenerator
    dotnet tool update -g dotnet-aspnet-codegenerator
    ```

## Database Setup

1. **Add SQLite3 support:**
    ```bash
    dotnet add package Microsoft.EntityFrameworkCore.Sqlite
    dotnet add package Microsoft.Data.Sqlite
    sqlite3 BookCatalog.db
    ```

2. **Update `Program.cs` to include SQLite connection:**
    ```csharp
    builder.Services.AddDbContext<BookContext>(opt =>
        opt.UseSqlite(builder.Configuration.GetConnectionString("BookCatalog")));
    ```

## Swagger Setup

1. **Install Swashbuckle.AspNetCore.Annotations package:**
    ```bash
    dotnet add package Swashbuckle.AspNetCore.Annotations
    ```

2. **Add read-only ID annotation in models:**
    ```csharp
    using Swashbuckle.AspNetCore.Annotations;

    [SwaggerSchema(ReadOnly = true)]
    public long Id { get; set; }
    ```

## Database Migration

1. **Install Entity Framework tools:**
    ```bash
    dotnet tool install --global dotnet-ef
    ```

2. **Perform database migration:**
    ```bash
    dotnet ef migrations add InitialCreate
    dotnet ef database update
    ```

## Usage

- **Run the project:**
  ```bash
  dotnet run
  ```

- **Run with HTTPS:**
  ```bash
  dotnet run --launch-profile https
  ```

## Generating CRUD Controllers

- **Generate CRUD controllers for models:**
  ```bash
  dotnet aspnet-codegenerator controller -name BookItemsController -async -api -m BookItem -dc BookContext -outDir Controllers
  dotnet aspnet-codegenerator controller -name CommentItemsController -async -api -m CommentItem -dc BookContext -outDir Controllers
  ```

## Notes

- **Modify the return statement in Post method of controllers:**
  ```csharp
  return CreatedAtAction(nameof(GetBookItem), new { id = bookItem.Id }, bookItem);
  ```

This README provides clear instructions for setting up and running the Server API project, including database setup, Swagger integration, and CRUD controller generation.

