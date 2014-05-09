/*global module, require*/
module.exports.paginate = function (model, req, callback) {
    'use strict';
    
    model.count(req.body.filter, function (err, total) {
        var totalPages = Math.ceil(total / req.body.options.pageSize),
            pagination = {
                page: {
                    totalItems: total,
                    totalPages: totalPages,
                    currentPage: req.body.options.currentPage
                },
                queryOptions:  {
                    skip: ((req.body.options.currentPage - 1) * req.body.options.pageSize),
                    limit: req.body.options.pageSize
                }
            };
        
        if (req.body.options.sort) {
            pagination.queryOptions.sort = req.body.options.sort;
        }
        
        callback(pagination);
    });
};