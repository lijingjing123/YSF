module.exports = function(grunt) {
  // LiveReload的默认端口号，你也可以改成你想要的端口号
  var lrPort = 35729;
  // 使用connect-livereload模块，生成一个与LiveReload脚本
  // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
  var lrSnippet = require('connect-livereload')({
    port: lrPort
  });
  // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
  var lrMiddleware = function(connect, options, middlwares) {
    return [
    // 把脚本，注入到静态文件中
    lrSnippet,
    // 静态文件服务器的路径
    serveStatic(options.base[0]),
    // 启用目录浏览(相当于IIS中的目录浏览)
    serveIndex(options.base[0])];
  };
  // 配置任务参数
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 通过connect任务，创建一个静态服务器
    connect: {
      options: {
        // 服务器端口号
        port: 8999,
        // 服务器地址(可以使用主机名localhost，也能使用IP)
        hostname: '192.168.1.231',
        // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
        base: '.'
      },
      livereload: {
        options: {
          // 通过LiveReload脚本，让页面重新加载。
          middleware: lrMiddleware
        }
      }
    },

  
    //concat插件（合并js文件）
     concat: {
        // 子任务名称，这名称随你起
        dev: {
            // 可选的配置参数
            options: {
              banner: '/*!\n * <%= pkg.name %> - JS for Debug\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * http://blog.csdn.net/jennieji | Licence: MIT\n */\n'
            },
            // 源文件路径
            src: [
              'src/js/common.js','src/js/pro_detail.js'
            ],
            // 运行任务后生成的目标文件
           dest: 'dist/js/hebin.js',
        }
    },
      //uglify插件（压缩javascript代码）
    uglify: {
      options: {
        striBanners: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' //添加banner
      },
      build: {
        files: {
          'dist/js/index.min.js': ['src/js/index.js'],
          'dist/js/app.min.js': '<%= concat.dev.dest %>'
        }
      },
    },
    //jshint插件（javascript语法错误检查）
    jshint: {
      build: ['src/Js/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    //csslint插件（检查css语法错误）
    csslint: {
      build: ['src/Css/*.css'],
      options: {
        csslintrc: '.csslintrc'
      }
    },
    //cssmin插件（压缩css代码）
    cssmin: {
      options: {
        keepSpecialComments: 0,
        /* 删除所有注释 */
        banner: '/* minified css file */'
      },
      build: {
        files: {
          'dist/css/index.min.css': ['src/css/index.css'],
          'dist/css/pro.min.css': ['src/css/pro_detail.css']
        }
      }
     
    },
    


    //watch插件（真正实现自动化）
    watch: {
      build: {
        files: ['src/Js/*.js', 'src/Css/*.css'],
        tasks: ['uglify','cssmin'],
        options: {
          spawn: false
        }
      },
      check: {
        files: ['src/Js/*.js', 'src/Css/*.css'],
        tasks: ['jshint','csslint'],
        options: {
          spawn: false
        }
      },
      client: {
        // 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
        options: {
          livereload: lrPort
        },
        // '**' 表示包含所有的子目录
        // '*' 表示包含所有的文件
        files: ['src/View/*.html', 'src/Css/*', 'src/Js/*', 'src/Images/*','src/Upload/*']
      }
    },

  });

  // 插件加载（加载 "cssmin" 模块）
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // 自定义任务：通过定义 default 任务，可以让Grunt默认执行一个或多个任务。
  //告诉我们将使用插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['cssmin', 'watch']); //压缩css文件
  grunt.registerTask('live', ['connect', 'watch']); //静态服务器以及监控文件变化  
  grunt.registerTask('check', ['csslint', 'jshint', 'watch']); //检查css和js代码
  grunt.registerTask('jsAction', ['concat','uglify', 'watch']); //压缩和合并js文件
};