

module.exports = function(sequelize, DataTypes) {

	var Camp = sequelize.define('Camp', {
			title: DataTypes.STRING,
			size: DataTypes.STRING,
			description: DataTypes.TEXT,
			address: DataTypes.TEXT,
			telephone: DataTypes.STRING,
			email: DataTypes.STRING,
			url: DataTypes.STRING,
			facebook: DataTypes.STRING			
		},
		{
			associate: function(models){
				Camp.belongsTo(models.User);
			}
		}
	);

	return Camp;
};
