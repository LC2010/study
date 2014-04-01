__d("lowerDomain", []function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ ) {
    if (document.domain.toLowerCase().match(/(^|\.)facebook\..*/)) document.domain = "facebook.com";
});
