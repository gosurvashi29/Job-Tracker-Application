User.hasMany(JobApplication, { foreignKey: 'user_id' });
JobApplication.belongsTo(User, { foreignKey: 'user_id' });

Company.hasMany(JobApplication, { foreignKey: 'company_id' });
JobApplication.belongsTo(Company, { foreignKey: 'company_id' });

JobApplication.hasMany(Reminder, { foreignKey: 'application_id' });
Reminder.belongsTo(JobApplication, { foreignKey: 'application_id' });

JobApplication.hasMany(ApplicationProgress, { foreignKey: 'application_id' });
ApplicationProgress.belongsTo(JobApplication, { foreignKey: 'application_id' });

JobApplication.hasMany(File, { foreignKey: 'application_id' });
File.belongsTo(JobApplication, { foreignKey: 'application_id' });
