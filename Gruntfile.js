module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
     
        html: {
          files: ['public/views/**'],
          options: {
            livereload: true,
          },

        },
        js: {
          files: ['public/js/**'],
          options: {
            livereload: true,
          },

        },
        css: {
          files: ['public/sass/*.scss'],
          tasks: ['compass'],
          options: {
            livereload: true,
          },
        }      
    },

    jshint: {
      all: ['Gruntfile.js']
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'public/sass',
          cssDir: 'public/css',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'public/sass',
          cssDir: 'public/css'
        }
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          args: ['production'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['app', 'config'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      },
      exec: {
        options: {
          exec: 'less'
        }
      }
    },
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
    
  });

  // Load NPM tasks 

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');




  // Default task(s).

  grunt.registerTask('default', ['jshint','compass', 'concurrent:target']);

};
