'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Page.init(
    {
      handle: DataTypes.STRING,
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      bodySummary: DataTypes.TEXT,
      seoDescription: DataTypes.TEXT,
      seoTitle: DataTypes.STRING,
      seo: {
        type: DataTypes.VIRTUAL,
        get() {
          return {
            title: this.seoTitle,
            description: this.seoDescription,
          };
        },
      },
    },
    {
      sequelize,
      modelName: 'Page',
      hooks: {
        beforeValidate(page) {
          if (!page.handle && page.title) {
            page.handle = page.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '');
          }
        },
      },
    }
  );
  return Page;
};
