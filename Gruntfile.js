/*
 *
 * Copyright (c) 2014 Efremov Alexey (lexich)
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({        
    clean: {
      dist: ['build'],
    },
    coffee:{
      dist:{
        options:{
          bare:true
        },
        files:[{
          expand: true,
          cwd:"dist/",
          src:"*.coffee",
          dest:"build/",
          rename: function(dest, filename, orig){
            return dest + filename.replace( /([^\/]+)\.coffee$/, "$1.js");
          }
        }]
      }      
    },
    uglify:{
      dist:{
        files:[{
          expand: true,          
          cwd:"build/",
          src:"*.js",
          dest:"build/",
          rename: function(dest, filename, orig){
            return dest + filename.replace( /([^\/]+)\.js$/, "$1.min.js");
          }
        }]        
      }
    },
    
    version:{
      dist:{
        src:[
          "build/*.js",
          "dist/*.coffee",
          "bower.json"
        ]
      }
    }
  });  
  grunt.registerTask('build', [
    'clean:dist', 
    'coffee:dist', 
    'uglify:dist',
    'version:dist'
  ]);  

  grunt.registerTask('default', ['build']);
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  grunt.loadNpmTasks('grunt-version');
};