import QuoteCard from "./QuoteCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full max-w-full flex flex-col items-center md:items-start justify-start px-8 md:pl-20">
      <h1 className="text-2xl md:text-5xl font-bold text-white">
        {name} Profile
      </h1>
      <p className="text-left text-white mt-2">{desc}</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1100px] gap-4">
        {data.map((item, index) => (
          <QuoteCard
            key={index}
            post={item}
            handleEdit={() => handleEdit && handleEdit(item)}
            handleDelete={() => handleDelete && handleDelete(item)}
          />
        ))
        }
      </div>

    </section>
  )
}

export default Profile