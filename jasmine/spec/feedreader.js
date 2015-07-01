/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* All tests are within the $() function, since some of these 
 * tests may require DOM elements. We want to ensure they don't 
 * run until the DOM is ready.
 */
$(function() {
    "use strict";
    /* This suite is all about the RSS feeds definitions, 
     * the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* It tests to make sure that the allFeeds variable has 
         * been defined and that it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed in the allFeeds object 
         * and ensures it has a URL defined and that the URL is not empty.
         */
         it('urls are defined', function() {
            //loop through each feeds
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            });
         });

        /* Test that loops through each feed in the allFeeds object 
         * and ensures it has a name defined and that the name is not empty.
         */
         it('names are defined', function() {
            //loop through each feeds
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            });
         });
    });


    // This suite is all about how menu element behaves
    describe('The menu', function() {
        // Ensures the menu element is hidden by default
         it('is hidden by default', function() {
            var headclass = $("body").attr("class");
            // expect body tag to have 'menu-hidden' class by default
            expect(headclass).toMatch('menu-hidden');
         });
             
         /* Ensures the menu changes visibility when the 
          * menu icon is clicked. This test should have two 
          * expectations: does the menu display when clicked 
          * and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            var headclass = $("body").attr("class");
            //After first click, body class is supposed to be empty
            $('.menu-icon-link').click();
            expect($.trim($(headclass).html())).toMatch('');
            //After second click, body class is hidden again
            $('.menu-icon-link').click();
            expect(headclass).toMatch('menu-hidden');
        });
    });

    // This suite is all about how feed entries behaves
    describe('Initial Entries', function() {
        /* Ensures when the loadFeed function is called and completes its work, 
         * there is at least a single .entry element within the .feed container.
         */
        beforeEach(function(done) { 
            loadFeed(0, function() {
                done();
            });
        });
        /* After the loadFeed function is finished, it is expected to
         * see more than one entry element
         */
        it('contains at least a single .entry element', function(done) {
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
        });
    });


    // This suite is all about the new feed selection behaves
    describe('New Feed Selection', function() {

        /* This test ensures when a new feed is loaded by the loadFeed 
         * function that the content actually changes.
         */
        beforeEach(function(done) { 
            loadFeed(0, function() {
                done();
            });
        });
        /* After loadFeed is called, if there is no error in the callback,
         * contentChange flag will become true. This means the content 
         * actually changes
         */
        it('changes content', function(done) {
            expect(contentChange).toBe(true);
            done();
        });
    });
}());
