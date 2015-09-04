'use strict';

// Gruntの内容を定義
module.exports = function(grunt) {

    // 必要なモジュール読み込み
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-autoprefixer');

    //タスク定義
    grunt.initConfig({
        //ファイル監視
        watch: {
            sass: {
                files: ['./**/*.scss'],
                tasks: ['compass:dev']
            }
        },
        //コンパイル
        compass: {
            dev: {
                options: {
                    config: 'compass_config.rb',
                    environment: "development"
                },
                sourcemap: true
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8'] // -> ブラウザの対応バージョンをオプションで決定できます。
            },
            file: {
                expand: true,
                flatten: true,
                src: './**/*.css', // -> 変更前のcss
                dest: './**/*.css' // -> 変更後のcss
            }
        },

        // Uglify ファイル圧縮
        //        uglify: {
        //            minify: {
        //                dynamic_mappings: {
        //                // Gruntは"minify"タスクが実行さされると、lib/"配下で.js"を探し、
        //                // src-destのファイルマッピングをビルドするため、ファイルが追加・削除されても
        //                // Gruntfileを更新する必要はありません。
        //                    files: [
        //                        {
        //                            expand: true,     // 動的拡張機能を有効
        //                            cwd: '/',      // マッチするsrcはこのパスの相対
        //                            src: ['**/*.js'], // マッチする実際のパターン
        //                            dest: '/',   // 遷移先のパスの先頭部分
        //                            ext: '.min.js',   // 遷移先のファイルパスにつける拡張子
        //                        }
        //                    ]
        //                }
        //            }
        //        },
        //console.logを削除
        removelogging: {
            dist: {
                src: "./**/*.js",
                dest: "./**/*.js",
                options: {
                    // see below for options. this is optional. 
                }
            }
        },
        //browser-sync setting
        browserSync: {
            files : {
                src: [
                    './**/*.html',
                    //'./**/*.js',
                    //'./**/*.scss',
                    './**/*.css'
                ]
            },
            options:{
                watchTask: true,
                server:{
                    //proxy: "local.abc",
                    //index: 'list.html',
                    baseDir: "./"
                },
                ghostMode:{
                    scroll: true,
                    links: true,
                    forms: true
                }
            }
        }

    });

    //タスク実行
    grunt.registerTask('default', ['browserSync', 'watch', 'compass', 'autoprefixer']);
    grunt.registerTask('bs', ['browserSync']);
    grunt.registerTask('remove', ['removelogging']);
    //grunt.registerTask('mini', ['uglify']);

};