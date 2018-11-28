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
    [Migration("20181116215041_ShtuarPublikId")]
    partial class ShtuarPublikId
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024");

            modelBuilder.Entity("DatingApp.API.Models.Foto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DataEShtimit");

                    b.Property<int>("PerdoruesId");

                    b.Property<string>("Pershkrimi");

                    b.Property<string>("PublikId");

                    b.Property<string>("Url");

                    b.Property<bool>("aKryesor");

                    b.HasKey("Id");

                    b.HasIndex("PerdoruesId");

                    b.ToTable("Fotot");
                });

            modelBuilder.Entity("DatingApp.API.Models.Perdorues", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DataELindjes");

                    b.Property<byte[]>("FjalekalimHash");

                    b.Property<byte[]>("FjalekalimKryp");

                    b.Property<string>("Gjinia");

                    b.Property<string>("Intereset");

                    b.Property<string>("InteresuarPer");

                    b.Property<DateTime>("KrijuarMe");

                    b.Property<string>("NjohurSi");

                    b.Property<string>("Perdoruesi");

                    b.Property<string>("Prezantimi");

                    b.Property<string>("Qyteti");

                    b.Property<DateTime>("SeFundiAktiv");

                    b.Property<string>("Shteti");

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

            modelBuilder.Entity("DatingApp.API.Models.Foto", b =>
                {
                    b.HasOne("DatingApp.API.Models.Perdorues", "Perdorues")
                        .WithMany("Fotot")
                        .HasForeignKey("PerdoruesId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
