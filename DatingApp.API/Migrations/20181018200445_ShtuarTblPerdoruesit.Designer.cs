﻿// <auto-generated />
using System;
using DatingApp.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DatingApp.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20181018200445_ShtuarTblPerdoruesit")]
    partial class ShtuarTblPerdoruesit
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024");

            modelBuilder.Entity("DatingApp.API.Models.Perdorues", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("FjalekalimHash");

                    b.Property<byte[]>("FjalekalimKryp");

                    b.Property<string>("Perdoruesi");

                    b.HasKey("Id");

                    b.ToTable("Perdoruesit");
                });

            modelBuilder.Entity("DatingApp.API.Models.Vlera", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Emer");

                    b.HasKey("Id");

                    b.ToTable("Vlerat");
                });
#pragma warning restore 612, 618
        }
    }
}
