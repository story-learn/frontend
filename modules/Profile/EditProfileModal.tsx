import { FC, useState } from "react";
import { Button, Input, InputImage, Modal, TextArea } from "../../components";
import { StyledForm } from "../../components/Form/FormStyles";
import { ModalProps } from "../../components/Modal/Index";
import { PersonIcon } from "../../components/SVGs";
import { useProfileContext } from "../../context/pages/Profile";
import { editProfile } from "../../utilities/Profile";
import { ProfileImage } from "./index";
import { StyledModalFormAvatar } from "./styles";

interface IEdit extends ModalProps {}

const EditProfileModal: FC<IEdit> = (props) => {
    const {
        closeModal,
        // data: { bio, first_name, last_name, profile_picture, username },
    } = props;
    const {
        profile: {
            main,
            tabs: { lists },
        },
        dispatchProfile,
    } = useProfileContext();

    let { first_name, last_name, profile_picture, username, bio } = main.data!;

    // const [intialProfileValues, setIntialProfileValues] = useState({
    const [intialProfileValues] = useState({
        profile_picture,
        username,
        bio,
        first_name,
        last_name,
    });

    const [editProfileFields, setEditProfileFields] = useState({
        profile_picture,
        username,
        bio,
        first_name,
        last_name,
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;

        setEditProfileFields((prev) => ({ ...prev, [name]: value }));
    };

    const disableSaveButton = () => {
        if (
            editProfileFields.first_name === intialProfileValues.first_name &&
            editProfileFields.last_name === intialProfileValues.last_name &&
            editProfileFields.username === intialProfileValues.username &&
            editProfileFields.bio === intialProfileValues.bio &&
            editProfileFields.profile_picture ===
                intialProfileValues.profile_picture
        ) {
            return true;
        }
        return false;
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // dispatch update profile
            dispatchProfile({
                type: "edit_profile",
                payload: editProfileFields,
            });

            // send request to update profile
            await editProfile(editProfileFields);
            // await
        } catch (error) {
            // revert ui
            dispatchProfile({
                type: "edit_profile",
                payload: intialProfileValues,
            });
        } finally {
            closeModal!();
        }
    };

    const [previewImage, setPreviewImage] = useState(profile_picture);

    const handleProfilePictureChange = (preview: string, imageVal: string) => {
        // console.log({ preview, imageVal });

        setPreviewImage(preview);
        setEditProfileFields((prev) => ({
            ...prev,
            profile_picture: imageVal,
        }));
    };

    return (
        <Modal
            {...props}
            title="Edit Profile"
            showCloseBtn={false}
            extraClassName="modalEditProfile"
        >
            <StyledForm className="form" onSubmit={handleSave}>
                <StyledModalFormAvatar>
                    <ProfileImage profile_picture={previewImage} />
                    <InputImage handleFileChange={handleProfilePictureChange} />
                </StyledModalFormAvatar>
                <Input
                    value={editProfileFields.first_name}
                    name="first_name"
                    id="first_name"
                    label="First Name"
                    placeholder="First name"
                    handleChange={handleFormChange}
                    Icon={
                        <figure className="form__input-icon">
                            <PersonIcon />
                        </figure>
                    }
                />
                <Input
                    value={editProfileFields.last_name}
                    name="last_name"
                    id="last_name"
                    label="Last Name"
                    placeholder="Last name"
                    handleChange={handleFormChange}
                    Icon={
                        <figure className="form__input-icon">
                            <PersonIcon />
                        </figure>
                    }
                />
                <Input
                    value={editProfileFields.username}
                    name="username"
                    id="username"
                    label="Username"
                    placeholder="Username"
                    handleChange={handleFormChange}
                    Icon={
                        <figure className="form__input-icon">
                            <PersonIcon />
                        </figure>
                    }
                />
                <TextArea
                    name="bio"
                    id="bio"
                    maxLength={160}
                    onChange={(val) =>
                        setEditProfileFields((prev) => ({ ...prev, bio: val }))
                    }
                    onKeyDown={() => {}}
                    value={editProfileFields.bio || ""}
                    className=""
                    placeholder="Your bio..."
                    label="Bio"
                    rows={10}
                />

                <div className="form__control form--action">
                    <Button
                        text="Save"
                        type="submit"
                        className="form__submit"
                        disabled={disableSaveButton()}
                    />
                    <Button
                        text="Cancel"
                        type="button"
                        className="form__cancel"
                        onClick={closeModal}
                    />
                </div>
            </StyledForm>
        </Modal>
    );
};

export default EditProfileModal;
