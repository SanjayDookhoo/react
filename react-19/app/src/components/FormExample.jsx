const FormExample = () => {
    return <>
        <form>
            {/* Because react allows reusing components, you dont want a reused component to cause multiple of the same ids to repeat, to avoid this you can wrap the input in a label instad, and put the label text in a span inside the label, the association will still be there and you can still style appropriately */}
            <label>
                <span className="label-text">Email</span>
                <input type="email"/>
            </label>
        </form>
    </>
}

export default FormExample