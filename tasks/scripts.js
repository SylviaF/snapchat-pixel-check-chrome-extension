import gulp from 'gulp';
import babel from 'gulp-babel';
import gulpif from 'gulp-if'
import {
    log,
    colors
} from 'gulp-util'
import named from 'vinyl-named'
import webpack from 'webpack'
import gulpWebpack from 'webpack-stream'
import plumber from 'gulp-plumber'
import livereload from 'gulp-livereload'
import args from './lib/args'
console.log(__dirname);

const ENV = args.production ? 'production' : 'development';

gulp.task('scripts', (cb) => {
    return gulp.src('app/scripts/**/*.js')
        // .pipe(babel({
        //     presets: ['es2015', 'react']
        // }))
        .pipe(plumber({
            // Webpack will log the errors
            errorHandler() {}
        }))
        .pipe(named())
        .pipe(gulpWebpack({
                devtool: args.sourcemaps ? 'inline-source-map' : false,
                // entry: {
                //   vendor: ['react', 'react-dom']
                // },
                watch: args.watch,
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env.NODE_ENV': JSON.stringify(ENV),
                        'process.env.VENDOR': JSON.stringify(args.vendor)
                    }),
                    new webpack.ProvidePlugin({
                        "React": "react",
                    })
                ].concat(args.production ? [
                    new webpack.optimize.UglifyJsPlugin()
                ] : []),
                module: {
                    loaders: [{
                        test: /\.jsx?$/,
                        loader: "babel-loader",
                        options: {
                            presets: [
                                 require.resolve('babel-preset-react'),
                                 require.resolve('babel-preset-es2015'),
                                 require.resolve('babel-preset-stage-0')
                            ],
                            // plugins: [
                            //     [
                            //         "transform-runtime", {
                            //             polyfill: false,
                            //             regenerator: true
                            //         }
                            //     ]
                            // ]
                        }
                    }]
                //     rules: [{
                //         test: /\.js$/,
                //         use: {
                //             loader: 'babel-loader',
                //             options: {
                //                 presets: ['es2015', 'react']
                //             }
                //         }
                //     }]
                }
            },
            webpack,
            (err, stats) => {
                if (err) return
                log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                    chunks: false,
                    colors: true,
                    cached: false,
                    children: false
                }))
            }))
        .pipe(gulp.dest(`dist/${args.vendor}/scripts`))
        .pipe(gulpif(args.watch, livereload()))
})