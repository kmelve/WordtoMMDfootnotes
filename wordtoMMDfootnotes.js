var notes = [];  // empty array for the footnotes

// Loop through the footnote entries
$('a[href*="ftnref"]').each(function (i) {
    var n = i+1;
    notes.push($(this[i]).parent().text()); // lets fill that array with the footnote text
    $(this).parent().wrap('<li class="footnote" id=fn:' + n + '>' + notes[i] + '</li>');
    $(this).remove(); // get rid of those divs!
});

//get rid of those divs and wrap footnotes in a nice ordered list
$('.footnote').parent().wrapAll('<div class="footnotes" />');
$('div > .footnote').unwrap();
$('.footnotes').wrapInner('<ol></ol>');

// Loop through all footnote reference numbers in the body text. Tip for CSS fallback styling: a[href^="#_ftn"]
$('a[href*="_ftn"]').each(function (i) {
    i = i+1;
    $(this).removeAttr( "title" ); // titles, who need 'em
    $(this).removeAttr( "style" ); // get rid of those mother f'ing inline styles 
    $(this).text(function () {
        return $(this).text().replace(/\[(\d*)\]/gi, "$1");  // we don't need brackets either
    });
    $(this).attr('rel','footnote');
    $(this).attr('href', function () {
        return '#fn:' + i;
    });
});
