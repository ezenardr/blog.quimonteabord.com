import Style from './titleBox.module.scss';

export default function TitleBox() {
    return (
        <div className={Style.pageTitleBox}>
            <p className={Style.title}>Dashboard</p>
            <p className={Style.path}>Home / Dashboard</p>
        </div>
    );
}
