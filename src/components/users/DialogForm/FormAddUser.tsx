import { useUsersStore } from '@/store/users/users-store';
import { useForm } from 'react-hook-form';
import { Grid2 as Grid, TextField } from '@mui/material';
import { CustomButton } from '@/components/button/CustomButton';
import SaveIcon from '@mui/icons-material/Save';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import type { UserStore } from '@/ts';

export const FormAddUser = () => {
	const { addUser } = useUsersStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<UserStore>({
		mode: 'onChange'
	});

	const onSubmit = (data: UserStore) => {
		addUser(data);
	};

	const handleReset = () => {
		reset();
	};

	return (
		<Grid
			container
			justifyContent="center"
			spacing={2}
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			width="100%"
		>
			<Grid size={12}>
				<TextField
					fullWidth
					required={true}
					{...register('name', {
						required: 'Campo requerido'
					})}
					type="text"
					variant="outlined"
					label="Nombre"
					placeholder="Ingrese Nombre"
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
			</Grid>
			<Grid size={12}>
				<TextField
					fullWidth
					required={true}
					{...register('email', {
						required: 'Campo requerido',
						pattern: {
							value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
							message: 'Ingrese dirección de correo electrónico válida'
						}
					})}
					type="text"
					variant="outlined"
					label="Correo"
					placeholder="Ingrese Correo"
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
			</Grid>
			<Grid size={12}>
				<TextField
					fullWidth
					required={true}
					{...register('city', {
						required: 'Campo requerido'
					})}
					type="text"
					variant="outlined"
					label="Ciudad"
					placeholder="Ingrese Ciudad"
					error={!!errors.city}
					helperText={errors.city?.message}
				/>
			</Grid>
			<Grid size={12}>
				<TextField
					fullWidth
					required={true}
					{...register('phone', {
						required: 'Campo requerido'
					})}
					type="text"
					variant="outlined"
					label="Teléfono"
					placeholder="Ingrese Teléfono"
					error={!!errors.phone}
					helperText={errors.phone?.message}
				/>
			</Grid>
			<Grid size={12}>
				<TextField
					fullWidth
					required={true}
					{...register('website', {
						required: 'Campo requerido'
					})}
					type="text"
					variant="outlined"
					label="Sitio Web"
					placeholder="Ingrese Sitio Web"
					error={!!errors.website}
					helperText={errors.website?.message}
				/>
			</Grid>

			<Grid size={3}>
				<CustomButton title="Agregar" icon={SaveIcon} type="submit" />
			</Grid>

			<Grid size={3}>
				<CustomButton
					title="Limpiar"
					icon={CleaningServicesIcon}
					type="reset"
					color="error"
					onHandleClick={handleReset}
				/>
			</Grid>
		</Grid>
	);
};
