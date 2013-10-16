var eb = new vertx.EventBus(window.location.protocol + '//' +
                            window.location.hostname + ':' +
                            window.location.port + '/eventbus');
eb.onopen = function() {

  var renderListItem = function(mindMap) {
    var li = $('<li>');

    var openMindMap = function() {
      new MindMapEditor(mindMap, eb);
      return false;
    };

    var deleteMindMap = function() {
      eb.send('mindMaps.delete', {id: mindMap._id}, function() {
        li.remove();
      });
      return false;
    };

    $('<a>').text(mindMap.name).attr('href', '#').on('click', openMindMap).appendTo(li);
    $('<button>').text('Delete').on('click', deleteMindMap).appendTo(li);

    li.appendTo('.mind-maps');
  };

  $('.create-form').submit(function() {
    var nameInput = $('[name=name]', this);
    eb.send('mindMaps.save', {name: nameInput.val()}, function(result) {
      renderListItem(result);
      nameInput.val('');
    });
    return false;
  });

  eb.send('mindMaps.list', {}, function(res) {
    $.each(res.mindMaps, function() {
      renderListItem(this);
    })
  })

};
