// ! example For reference

/* 
import { Category } from '@vitabotx/common/entities/master/category.entity'
import { DataSource } from 'typeorm'

export const seedGoalCategory = async (dataSource: DataSource) => {
	const goalCategoryRepository = dataSource.getRepository(Category)

	const goalCategories = [{ name: 'Fitness' }]

	for (const goalCategory of goalCategories) {
		const existingUser = await goalCategoryRepository.findOne({
			where: { name: goalCategory.name }
		})
		if (!existingUser) {
			await goalCategoryRepository.save(goalCategory)
		}
	}
}
*/
