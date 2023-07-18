import Billboard from "@/components/billboard";
import InfoModel from "@/components/infoModel";
import MovieList from "@/components/movieList";
import NavBar from "@/components/navBar";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return { 
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModel visible={isOpen} onClose={closeModal}/>
      <NavBar/>
      <Billboard/>
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My list" data={favorites}/>
      </div>
    </>
  )
}
