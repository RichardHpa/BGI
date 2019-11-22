$('.staffCard').click(function(e){
    $.ajax({
        url: `/api/staff/single/${$(this).data('id')}`,
        type: 'get',
        success:function(data){
            $('#staffTitle').text(data.name);
            $('#staffRole').text(data.role);
            $('#staffBio').text(data.bio);
            $('#staffImg').attr('src', `images/uploads/thumbnails/${data.image}`);
            $('#staffEmail').attr('href', `mailto:${data.email}`);
            $('#staffModal').modal('show');
        },
        error: function(err){
            console.log(err);
            alert('sorry there is an error with getting more information about this staff memeber');
        }
    })
})
