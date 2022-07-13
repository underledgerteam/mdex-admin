const AccessDenied = () => {
    return (
        <div className="flex h-[500px] justify-center items-center">
            <div>
                <h2 className="text-5xl font-bold text-red-600 mb-5">Access Denied</h2>
                <hr />
                <p className="mt-5 text-2xl text-white">You don't have permission to view this site.</p>
                <p className="mt-5 text-4xl text-white">🚫🚫🚫🚫</p>
            </div>
        </div>
    )

}

export default AccessDenied;