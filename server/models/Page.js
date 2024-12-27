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
      handle: {
        type: DataTypes.STRING,
        unique: true,
      },
      title: DataTypes.STRING,
      bodySummary: DataTypes.TEXT,
      body: DataTypes.TEXT,
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
        async beforeValidate(page) {
          if (!page.handle && page.title) {
            const baseHandle = (page.handle = page.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, ''));

            let uniqueHandle = baseHandle;
            let suffix = 2;

            while (
              await sequelize.models.Page.findOne({
                where: { handle: uniqueHandle },
              })
            ) {
              uniqueHandle = `${baseHandle}-${suffix}`;
              suffix++;
            }

            page.handle = uniqueHandle;
          }
        },
      },
    }
  );
  return Page;
};
