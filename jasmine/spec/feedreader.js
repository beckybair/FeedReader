/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    // test suite just contains a related set of tests.
    describe('RSS Feeds', function() {
      /* test to make sure that the allFeeds variable has been
         * defined and that it is not empty.
         */
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* test that loops through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
      it('url defined and is not empty', function() {
        for (i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].url).toBeDefined();
          expect(allFeeds[i].url).not.toBe('', '', null);
        }
      });

      /* test that loops through each feed in the allFeeds
         * object and ensures it has a name defined
         * and that the name is not empty.
         */
      it('name defined and is not empty', function() {
        for (i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].name).toBeDefined();
          expect(allFeeds[i].name).not.toBe('', '', null);
        }
      });
    });

    /* test suite named "The menu" */
    describe('The menu', function() {
        let body = document.querySelector('body');
        const menu = document.querySelector('.menu-icon-link');

        // test that ensures the menu element is hidden by default.
      it('menu hidden by default', function() {
        expect(body.classList.contains('menu-hidden')).toBe(true);
      });

      /* test that ensures the menu changes visibility when the menu icon
						* is clicked. This test should have two expectations:
						* does the menu display when clicked and
						* does it hide when clicked again.
            */
      it('menu visibility changes when clicked', function() {
        // simulate a menu click and then test the class is removed
        menu.click();
        expect(body.classList.contains('menu-hidden')).toBe(false);

        // simulate a menu click again to test the class is added back
        menu.click();
        expect(body.classList.contains('menu-hidden')).toBe(true);
      });
    });

    /* test suite named "Initial Entries" */
    describe('Initial Entries', function() {
      /* test that ensures when the loadFeed function is called and
					* completes its work, there is at least a single .entry
					* element within the .feed container.
          */

      // first need to load the feed fresh before each test
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      // test to make sure the loadfeed was called and completed
      it('LoadFeed was called and completed', function(done) {
        const feed = document.querySelector('.feed');
        expect(feed).toBeDefined();
        expect(feed.children.length).not.toBe(0);
        done();
      });
    });

    /* test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      /* test that ensures when a new feed is loaded
          * by the loadFeed function that the content actually changes.
          */
      let initialFeed = '';
      let diffFeed = '';

      // first need to load the feed fresh before each test
      beforeEach(function(done) {
        loadFeed(0); // first loadfeed completes
        initialFeed = $('.header-title')[0].innerHTML; // save the first header title to compare with later
        loadFeed(1, done); // second loadfeed completes
      });

      // now test the loadfeeds are different
      it('content changes when new feed is loaded', function(done) {
        diffFeed = $('.header-title')[0].innerHTML; // save the second header title
        expect(diffFeed).not.toBe(initialFeed); // the two header titles should not match
        done();
      });
    });
  })()
);
