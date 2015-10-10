module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/app.js'],
                dest: 'app/Built/built.js'
            }
        },
        uglify: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= concat.dist.dest %>'],
                dest: 'app/Built/built.js'
            }
        },
        watch: {
            scripts: {
                files: ['<%= concat.dist.src %>'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

};