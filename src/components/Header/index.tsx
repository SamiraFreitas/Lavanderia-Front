import './styles.scss';

type HeaderProps = {
  title: string;
}

export function Header({title}: HeaderProps) {
  return(
    <div id="Header" >
      <header>
        <h1>Painel Administrativo</h1>
        <h2>{title}</h2>
      </header>
      <div className="separator" ></div>
    </div>
  );
}