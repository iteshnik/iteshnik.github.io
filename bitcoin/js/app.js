

(function ($) {
  var TIME_CALLBACK = 700

  var app = $.sammy('#app', function () {


    this.use('Template');

    this.around(function (callback) {
      var context = this;
      this.load('data/articles.json')
        .then(function (items) {
          context.items = items;
        })
        .then(callback);
    });

    this.get('#/asd', function (context) {
      context.app.swap('');
      $.each(this.items, function (i, item) {
        context.render('templates/article.template', { id: i, item: item })
          .appendTo(context.$element());
      });
    });

    this.get('#/p1/', function (context) {
      context.app.setLocation('');
      showAppPreloader(true);
      var str = location.href.toLowerCase();
     
      context.app.swap('');
      setTimeout(function () {
        context.render('/ajax/p1.html', {}).appendTo(context.$element());
        setTimeout(function () {
          getRate('usd')
          btnShow(false);
          initTips();
          showAppPreloader(false);
        }, TIME_CALLBACK);
      }, TIME_CALLBACK-200);
    });


    this.get('#/p2/', function (context) {
      context.app.setLocation('');
      showAppPreloader(true);
      var str = location.href.toLowerCase();
      context.app.swap('');
      setTimeout(function () {
        context.render('/ajax/p2.html', {})
          .appendTo(context.$element());
          
        var mdn_loan = innerexchengemdn(loan_amount).toFixed(3);
        btcreserve = BTC_GRANTED * 1 + loan_amount * 1;
        mdnreserve = MDN_RESERVES * 1 + mdn_loan * 1;
        setTimeout(function () {
          setMdnCache(mdn_loan);
          setBtcCache(loan_amount * 1 + loan_amount * 0.03);
          setAmountLoan(loan_amount);
          setBtcReserve(btcreserve);
          setMdnReserve(mdnreserve);
          balshow(false);
          showAppPreloader(false);
          initAcept();
        }, TIME_CALLBACK);
      }, TIME_CALLBACK-200);

    });

    this.get('#/p3/', function (context) {
      context.app.setLocation('');
      showAppPreloader(true);
      var str = location.href.toLowerCase();
      context.app.swap('');

      setTimeout(function () {
        context.render('/ajax/p3.html', {})
          .appendTo(context.$element());
        setTimeout(function () {
          setAmountLoan(loan_amount);
          setCreditSlider(2);
          btnShow(true);
          initTips();
          showAppPreloader(false);
        }, TIME_CALLBACK);
      }, TIME_CALLBACK-200);

    });

    this.get('#/negative1/', function (context) {
      context.app.setLocation('');
      showAppPreloader(true);
      var str = location.href.toLowerCase();
      context.app.swap('');

      setTimeout(function () {
        context.render('/ajax/negative1.html', {})
          .appendTo(context.$element());
        setTimeout(function () {
          setCreditSlider(1);
          btnShow(true, 'n');
          initTips();
          showAppPreloader(false);
        }, TIME_CALLBACK);
      }, TIME_CALLBACK-200);
    });

    this.get('#/negative2/', function (context) {
      context.app.setLocation('');
      showAppPreloader(true);
      var str = location.href.toLowerCase();
      context.app.swap('');
      setTimeout(function () {
        context.render('/ajax/negative2.html', {})
          .appendTo(context.$element());
        setTimeout(function () {
          setCreditSlider(2);
          balshow(true);
          setMdnCache(MDN_CACHE);
          setBtcCache(BTC_CACHE);
          btnShow(true, 'n');
          initTips();
          showAppPreloader(false);
        }, TIME_CALLBACK);
      }, TIME_CALLBACK-200);
    });

    this.get('#/positive/', function (context) {
      context.app.setLocation('');
      showAppPreloader(true);
      var str = location.href.toLowerCase();
      context.app.swap('');
      setTimeout(function () {
        context.render('/ajax/positive.html', {})
          .appendTo(context.$element());
        setTimeout(function () {
          setCreditSlider(4);
          btnShow(true, 'p');
          balshow(true);
          setMdnCache(MDN_CACHE);
          setBtcCache(BTC_CACHE);
          initTips();
          showAppPreloader(false);
        }, TIME_CALLBACK);
      }, TIME_CALLBACK-200);
    });

    this.get('#/repay1/', function (context) {
      context.app.setLocation('');
      showAppPreloader(true);
      var str = location.href.toLowerCase();
      context.app.swap('');
      setTimeout(function () {
        context.render('/ajax/repay1.html', {})
          .appendTo(context.$element());
        setTimeout(function () {
          setAmountLoan(loan_amount);
          setBtcCache(loan_amount - ((loan_amount * 1 + loan_amount * 0.03) / 4));
          initTips();
          showAppPreloader(false);
        }, TIME_CALLBACK);
      }, TIME_CALLBACK-200);
    });

    this.get('#/repay2/', function (context) {
      context.app.setLocation('');
      showAppPreloader(true);
      var str = location.href.toLowerCase();
      context.app.swap('');
      setTimeout(function () {
        context.render('/ajax/repay2.html', {})
          .appendTo(context.$element());
        setTimeout(function () {
          setAmountLoan(loan_amount);
          setBtcCache(loan_amount - ((loan_amount * 1 + loan_amount * 0.03) / 4) * 2);
          btnShow(true);
          initTips();
          showAppPreloader(false);
        }, TIME_CALLBACK);
      }, TIME_CALLBACK-200);
    });

    this.get('#/repay3/', function (context) {
      context.app.setLocation('');
      showAppPreloader(true);
      var str = location.href.toLowerCase();
      context.app.swap('');
      setTimeout(function () {
        context.render('/ajax/repay3.html', {})
          .appendTo(context.$element());
        setTimeout(function () {
          setAmountLoan(loan_amount);
          setBtcCache(loan_amount - ((loan_amount * 1 + loan_amount * 0.03) / 4) * 3);
          btnShow(true);
          initTips();
          showAppPreloader(false);
        }, TIME_CALLBACK);
      }, TIME_CALLBACK-200);
    });



    this.before('.*', function () {

      var hash = document.location.hash;
      $("nav").find("a").removeClass("current");
      $("nav").find("a[href='" + hash + "']").addClass("current");
    });

  });

  $(function () {
    app.run('#/p1/');
  });

})(jQuery);