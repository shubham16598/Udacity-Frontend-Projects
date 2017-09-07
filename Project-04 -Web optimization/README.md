# Installation #

Nothing special needed. Download. Unzip. And run.

# Part 1 - Solution - PageSpeed #
* Minify CSS and placed into page head. Except for print css which now uses media tag. To minimise amount of downloads
* Change JS loading to async
* Change image format, size and compression

# Part 2 - Solution - Pizza FPS #
## Change Pizza Size ##
Originally I just removed some of the code to make it resize faster. My next idea was to create 3 classes and apply the new classes + remove old classes to resize pizza which bought it down to about 4-8ms to resize pizza.

Finally I realised I don't have to have JS cycle through the DOM changing classes. Instead of can just create and modify the class of the container and use CSS specification to change the sizes which is much faster.

## Background parallax scroller ##
### Background creation ###
Orignally 200 pizzas were being created no matter how many were to be displayed on screen.
So I changed this to instead check the screen size, and ensure that only enough pizza divs were created to fill the screen.
On window resize it deletes the pizzas, recalulates how many is needed and creatres them again.

One of the first optomisitions I made for movement was to use 'transform: translateX' instead of 'styel.left'.
There were a number of website that claims this would make it much faster and so I went with it. However in later testing I found it to be generally the same speed or slower,
especially in other browsers.

Maybe the most interesting thing I saw from testing was that each browser and platform can find different JS code faster.
For example, using translateX was over 50% slower on IE11. On chrome mobile, the test that had been coming last on desktop browsers was the fastest. On chrome desktop none of the rewrite made any real difference.

JSPref test can be found at: http://jsperf.com/udacity-optimise-loop-test/2
Screenshots of FPS using devtools: 
* Using style.left: http://ro-savage.github.io/udacity-optimise/views/images/style-left.jpg
* Using translateX: http://ro-savage.github.io/udacity-optimise/views/images/translate.jpg

Another realisation was that when optomising code, you need to check each optimisation individual if you haven't tried them before. I just assumed translateX would be faster because that is what it was telling me and then made other optimisations at the same time. Thus I couldn't see what change was making improvements when I was testing the code.

I also tested the best way to grab a DOM object and found getElementByID and getElementsByClass were must faster than the new querySelector method: http://jsperf.com/getelementbyid-vs-queryselector/137
I therefore updated all the selectors to use the old school method.

By far the most important optimisation for FPS in Chrome was a CSS hack by David Walsh (http://davidwalsh.name/translate3d). It forced each pizza to be in it's own composite layer and this saw a huge speed increase. When I first tried this it didn't work as I applied the translateX inline and therefore was appearing after page load. It turned out before Chrome rendered the DOM CSSOM it needed to know that this were 'transform' layers.

While the final code may not be as future proof, as the assignment was to optimise for speed I made the decision to go with style.left over translate. Not using translate also means losing the subpixel movement, however in practise as this is a background image moving in a horizontal line it doesn't make much difference.

Finally for download speed, the CSS and JS was minified and placed onto the single page. Images were compressed and resized.

See code for more comments.

# References #
## Animation ##
* http://jankfree.org/
* http://www.html5rocks.com/en/tutorials/speed/animations/
* http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

## Painting ##
* http://www.html5rocks.com/en/tutorials/speed/unnecessary-paints/
* http://www.html5rocks.com/en/tutorials/speed/rendering/
* http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
* https://piazza.com/class/i0sf6tsmg0r7do?cid=1200
* http://davidwalsh.name/translate3d

Scrolling:
* http://www.html5rocks.com/en/tutorials/speed/scrolling/

Testing performance
* http://aerotwist.com/blog/dont-guess-it-test-it/
* http://addyosmani.com/blog/performance-optimisation-with-timeline-profiles/
* https://developer.chrome.com/devtools/docs/rendering-settings
* https://developer.chrome.com/devtools/docs/timeline

Created JSPref's:
* http://jsperf.com/for-loop-optimisation
* http://jsperf.com/fastest-array-loops-in-javascript/329




## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
