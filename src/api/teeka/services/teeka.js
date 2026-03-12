'use strict';

/**
 * teeka service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::teeka.teeka');
