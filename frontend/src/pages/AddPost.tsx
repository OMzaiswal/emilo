
export const AddPost = () => {
    return <div>
        <p>Add new post</p>
        <div className="flex flex-col justify-center space-y-2">
            <textarea rows={3} className="border rounded-md" />
            <input type="file" className="border rounded-md" />
        </div>
    </div>
}