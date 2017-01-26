// == Initiate Bootstrap tooltip
$('[data-toggle="tooltip"]').tooltip();

// == Initiate Bootstrap popover
$('[data-toggle="popover"]').popover();

// == Initiate Bootstrap modal
// $('#modal-multipurpose').on('show.bs.modal', function (event) {
//   var mTrigger = $(event.relatedTarget),   // Link that triggered the modal.
//       mContent = mTrigger.data('content'), // Extract info from data-* attributes.
//       modal = $(this),                     // Assign modal to variable.
//       modalClose = '<button type="button" class="close" data-dismiss="modal" aria-label="Zamknij" title="Zamknij"> <span aria-hidden="true">×</span></button>';
//   // Update content of the modal.
//   modal.find('.modal-body').html($(mContent)).prepend(modalClose);
// });

// == Initiate Bootstrap scrollspy (body needs `position: relative`)
body.scrollspy({
  offset: navbarHeight,
  target: '#masthead'
});
