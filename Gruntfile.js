module.exports = function(grunt) {

    var base = 'public/controller/';
    var dest = 'public/built/';
    var assets = 'public/assets/';

    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [base + 'app.js', base + '*/*/*.js', assets + 'js/*.js'],
                dest: dest + 'built.js'
            }
        },
        uglify: {
            options: {
                separator: ';'
            },
            dist: {
                src: dest+'built.js',
                dest: dest+'built.js'
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

//sudo npm i grunt grunt-cli grunt-contrib-concat grunt-contrib-uglify grunt-contrib-watch