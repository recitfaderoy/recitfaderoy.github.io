const testFolder = './assets.mat_ima_textures/';
import { path } from 'path';
import { readdir } from 'fs-extra';


readdir('../assets/mat_ima_textures/', (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});


/*this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"
this.mat_ima_textures =  "./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg"*/
