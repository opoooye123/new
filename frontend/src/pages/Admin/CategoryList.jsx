import { useState } from "react"
import { toast } from "react-toastify";
import { useCreateCategoryMutation, useUpdateCategoryMutation, useFetcHCategoryQuery, useDeleteCategoryMutation } from '../../redux/api/categoryApiSlice'

const CategoryList = () => {
    const { data: categories } = useFetcHCategoryQuery()
        ;
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updateName, setUpdateName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();


    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
            {/* Adminmenu */}
            <div className="md:w-3/4 p-3">
                <div className="h-12">Manage Categories</div>
            </div>
        </div>)
}

export default CategoryList
