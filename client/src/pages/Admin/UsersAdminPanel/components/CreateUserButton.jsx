

export const CreateUserButton = ({ setIsOpenUserModal, setModo }) => {

    const handleCreate = () => {
        try {
            setIsOpenUserModal(true)
            setModo("crear")
        } catch (error) {
            console.log(error);

        }
    }

    return (
        < >

            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded focus:outline-none focus:shadow-outline" type="button"
                    onClick={handleCreate}
                >
                    Crear Usuario
                </button>
            </div>
        </>
    )
}